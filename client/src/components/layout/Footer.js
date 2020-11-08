import React from "react";

const footerStyle = {
  fontSize: "20px",
  color: "white",
  borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  padding: "20px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "70px",
  width: "100%"
};
const phantomStyle = {
  display: "block",
  padding: "20px",
  height: "60px",
  width: "100%"
};

function Footer({ children }) {
  return (
    <div>
      <div style={phantomStyle} />
      <div className="footer_color" style={footerStyle}>
        {children}
      </div>
    </div>
  );
}

export default () => {
  return (
    <div>
      <Footer>
        <span>Copyright &copy; {new Date().getFullYear()} Demando</span>
      </Footer>
    </div>
  );
};

//Copyright &copy; {new Date().getFullYear()} Demando
