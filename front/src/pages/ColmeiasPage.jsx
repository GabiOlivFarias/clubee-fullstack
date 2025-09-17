import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ColmeiasPage.css';

function ColmeiasPage({ communities, currentUser, onCreateCommunity, onJoinCommunity }) {
    const [newCommunityName, setNewCommunityName] = useState('');

    const handleCreate = () => {
        if (newCommunityName.trim()) {
            onCreateCommunity(newCommunityName.trim());
            setNewCommunityName('');
        }
    };

    return (
        <div className="colmeias-container">
            <header className="colmeias-header">
                <Link to="/dashboard" className="back-button">← Voltar para o Painel</Link>
                <h1>Explore as Colmeias 🐝</h1>
                <p>Encontre grupos sobre seus assuntos favoritos ou crie o seu!</p>
            </header>

            <div className="colmeias-content">
                <div className="create-colmeia-section">
                    <h3>Formar uma Nova Colmeia</h3>
                    <input 
                        type="text" 
                        value={newCommunityName}
                        onChange={(e) => setNewCommunityName(e.target.value)}
                        placeholder="Ex: Fãs de Minecraft" 
                    />
                    <button onClick={handleCreate}>Criar</button>
                </div>

                <div className="colmeias-list">
                    {communities.map(community => (
                        <div key={community.id} className="colmeia-card">
                            <h4>{community.name}</h4>
                            <p>{community.members} membro(s)</p>
                            {community.memberList && community.memberList.includes(currentUser.displayName) ? (
                                <button disabled>Você é membro</button>
                            ) : (
                                <button onClick={() => onJoinCommunity(community.id)}>Entrar</button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ColmeiasPage;
