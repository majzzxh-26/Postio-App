

const Footer = () => {
  const year = new Date().getFullYear(); // Corrected line: Added () to call the function
  
  return (
    <footer className="Footer">
        <p>Copyright &copy; {year}</p>
    </footer>
  )
}

export default Footer