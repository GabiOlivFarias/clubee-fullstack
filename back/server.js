require('dotenv').config(); // Carrega as chaves secretas do arquivo .env
const express = require('express'); // importa o express
const cors = require('cors'); // o cors pra nao dar problema e liberar o front
const session = require('express-session'); // Importa o sistema que cria os crachás de login
const passport = require('passport'); // Importa o gerente de autenticação
const GoogleStrategy = require('passport-google-oauth20').Strategy; //Importa a estratégia específica para conversar com o google

const app = express(); // aqui eu pego o express pra usar com Node, crio a istancia pro servidor
const PORT = 3001;

// --- CONFIGURAÇÃO DO CORS (A CORREÇÃO CRÍTICA ESTÁ AQUI) ---
// Precisamos ser explícitos sobre qual origem (o frontend) pode acessar
// e garantir que as credenciais (cookies) sejam permitidas.
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, sameSite: 'lax' } 
}));

app.use(express.json()); // Garante que o servidor entenda JSON
app.use(passport.initialize());
app.use(passport.session());


// --- CONFIGURAÇÃO DO PASSPORT (Estratégia Google) ---
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    proxy: true 
  },
  function(accessToken, refreshToken, profile, cb) {
    // Em um app real, aqui a gente salvaria ou buscaria o 'profile' no seu banco de dados
    return cb(null, profile);
  }
));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});


// --- ROTAS DE AUTENTICAÇÃO ---
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { 
      successRedirect: process.env.CLIENT_URL, // Redireciona para o frontend em caso de sucesso
      failureRedirect: `${process.env.CLIENT_URL}/login/failed` // Uma rota de falha no frontend
  })
);

app.get('/auth/logout', (req, res, next) => {
    req.logout(function(err) {
      if (err) { return next(err); }
      // Limpa o cookie da sessão e redireciona para o frontend
      req.session.destroy(() => {
          res.clearCookie('connect.sid');
          res.redirect(process.env.CLIENT_URL);
      });
    });
});

// --- ROTAS DA API ---
app.get('/api/user/me', (req, res) => {
    // Se req.user existir, o usuário está logado
    if (req.user) {
        res.json({ success: true, user: req.user });
    } else {
        res.status(401).json({ success: false, message: "Não autenticado" });
    }
});


// --- INICIAR O SERVIDOR ---
app.listen(PORT, () => {
    console.log(`🎉 Servidor backend rodando em http://localhost:${PORT}`);
});
