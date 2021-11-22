export function Login() {
    return (
        <form>
            <h1>Login Form</h1>
            <label htmlFor="email">E-mail</label>
            <input type="text" name="email" id="email" />

            <label htmlFor="password">Password</label>
            <input type="text" name="password" id="password" />

            <input type="submit" value="Login"/>

        </form>
    );
}