class LoginState implements I_GameState {

	public gameState(): E_GameStateType {
		return E_GameStateType.Login;
	}

	public enter(): void {
		console.log("--LoginState");
		GameStateManager.Instance.changeGameState(E_GameStateType.Home);
	}

	exit(): void {
		
	}
}