import React from "react";

interface BreadcrumbProps {
  paths: { name: string; link?: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ paths }) => {
  return (
    <nav aria-label="breadcrumb" style={{ fontSize: "14px", color: "#a5a5c3" }}>
      {paths.map((path, index) => (
        <span key={index}>
          {path.link ? (
            <a
              href={path.link}
              style={{
                textDecoration: "none",
                color: "#a5a5c3",
                marginRight: "4px",
              }}
            >
              {path.name}
            </a>
          ) : (
            <span style={{ marginRight: "4px" }}>{path.name}</span>
          )}
          {index < paths.length - 1 && <span> / </span>}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
