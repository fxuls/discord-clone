const ThemeProvider = (props) => {
  document.body.setAttribute("data-theme", "carbon");

  return <div {...props}>{props.children}</div>;
};

export default ThemeProvider;
