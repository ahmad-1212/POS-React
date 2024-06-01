import { Children } from 'react';
import Table from './Table';
import PropTypes from 'prop-types';

const 
DataTable = ({ head, edit, del, render, data }) => {
  return (
    <Table>
      <Table.Row>
        {head?.map((itm, i) => (
          <Table.Head key={i}>{itm}</Table.Head>
        ))}
        {edit && <Table.Head>Edit</Table.Head>}
        {del && <Table.Head>Delete</Table.Head>}
      </Table.Row>
      <Table.Body>
        {Children.toArray(data?.results?.map((item, i) => render(item, i)))}
      </Table.Body>
    </Table>
  );
};

DataTable.propTypes = {
  head: PropTypes.arrayOf('string').isRequired,
  edit: PropTypes.bool,
  del: PropTypes.bool,
  render: PropTypes.func,
  data: PropTypes.object,
};

export default DataTable;
