export function Register() {
    return (
        <form>
            <h1>Register Form</h1>

            <label htmlFor="firstName">First name</label>
            <input type="text" name="firstName" id="firstName" />

            <label htmlFor="lastName">Last name</label>
            <input type="text" name="lastName" id="lastName" />

            <label htmlFor="email">E-mail</label>
            <input type="text" name="email" id="email" />

            <label htmlFor="phone">Phone number</label>
            <input type="text" name="phone" id="phone" />

            <label htmlFor="password">Password</label>
            <input type="text" name="password" id="password" />

            <label htmlFor="repeatPassword">Repeat password</label>
            <input type="text" name="repeatPassword" id="repeatPassword" />

            <input type="submit" value="Register" />

        </form>
    );
}