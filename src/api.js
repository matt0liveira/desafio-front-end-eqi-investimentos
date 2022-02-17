const api = {
    getIndicadores: async () => {
        let response = await fetch(`http://localhost:3000/indicadores`)
        let json = await response.json()
        return json
    },

    submitSimulation: async (tipoIndexacao, tipoRendimento) => {
        let response = await fetch(`http://localhost:3000/simulacoes?tipoIndexacao=${tipoIndexacao}&tipoRendimento=${tipoRendimento}`)
        let json = await response.json()
        return json
    }
}

export default api