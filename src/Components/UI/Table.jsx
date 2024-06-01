import PropTypes from 'prop-types';

const Table = ({ children, className = '' }) => {
  return (
    <div
      className={`custom-scrollbar relative flex  w-full min-w-[98%] flex-col overflow-x-auto border-2 ${className}`}
    >
      <table className="w-full border-2 border-primary-100">{children}</table>
    </div>
  );
};

Table.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const Head = ({ children, className = '' }) => {
  return <th className={className}>{children}</th>;
};

Head.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const Row = ({ children, className = '' }) => {
  return <tr className={className}>{children}</tr>;
};

Row.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const Body = ({ children, className = '' }) => {
  return <tb className={className}>{children}</tb>;
};

Body.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Table.Head = Head;
Table.Row = Row;
Table.Body = Body;

export default Table;
