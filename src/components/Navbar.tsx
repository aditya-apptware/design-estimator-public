const Logo = new URL('../assets/Logo.png', import.meta.url).href;

const Navbar = () => {
  return (
    <div className="navbar-wrapper">
      <nav>
        <a href="/design-estimator">
        <img
          src={Logo}
         />
        </a>
      </nav>
    </div>
  )
}

export default Navbar
