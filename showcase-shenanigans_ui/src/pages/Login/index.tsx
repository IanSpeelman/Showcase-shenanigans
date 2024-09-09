const Login = () => {
  return (
    <div>
      <form>
        <input type="text" name="email" placeholder="E-Mail" />
        <input type="password" name="password" placeholder="Password" />
        <div>
          <button type="submit">Log In</button>
          <button>Register</button>
        </div>
      </form>
    </div>
  )
}




export default Login
