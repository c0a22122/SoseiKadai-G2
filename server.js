const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'soseikadai_g2',
    password: 'c0a22122', // PostgreSQLのパスワードを設定
    port: 5432,
});

app.use(cors());
app.use(bodyParser.json());

// ユーザー登録
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // 入力チェック
    if (!username || !password) {
        return res.status(400).json({ error: "ユーザー名とパスワードは必須です。" });
    }

    try {
        // パスワードをハッシュ化
        const hashedPassword = await bcrypt.hash(password, 10);

        // データベースにユーザーを挿入
        const result = await pool.query(
            "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id",
            [username, hashedPassword]
        );

        res.status(201).json({ id: result.rows[0].id });
    } catch (err) {
        // ユニーク制約違反の場合の処理
        if (err.code === "23505") {
            res.status(400).json({ error: "そのユーザー名は既に使用されています。" });
        } else {
            res.status(500).json({ error: "サーバーエラーが発生しました。" });
        }
    }
});

// ログイン
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // ユーザー名でデータベースからユーザーを取得
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        // ユーザーが見つからない場合
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'ユーザーが見つかりません。' });
        }

        const user = result.rows[0];

        // パスワードチェック
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: '認証情報が無効です。' });
        }

        // JWTトークンを生成
        const token = jwt.sign(
            { id: user.id, username: user.username },
            'your_secret_key',
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
