const ThemeProvider = (props) => {
  document.body.setAttribute("data-theme", "default");

  return <div {...props}>{props.children}</div>;
};

export default ThemeProvider;
