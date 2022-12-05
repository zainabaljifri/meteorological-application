import * as React from 'react';
import { styled } from '@mui/system';
import TablePaginationUnstyled, {
  tablePaginationUnstyledClasses as classes,
} from '@mui/base/TablePaginationUnstyled';
import uuid from 'react-uuid';

const Root = styled('div')`
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid #ddd;
    text-align: center;
    vertical-align:middle;
    padding: 8px;
  }
  .customRow:hover{
    background: AliceBlue
  }

  th {
    background-color: #ddd;
  }
  i{
    margin:20px;
  }
  .fa-chart-simple{
    color: blue;
  }
  .fa-pencil{
    color:orange;
  }
  .fa-trash-can{
    color:red;
  }
`;

const CustomTablePagination = styled(TablePaginationUnstyled)`
  & .${classes.toolbar} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.spacer} {
    display: none;
  }

  & .${classes.actions} {
    display: flex;
    gap: 0.25rem;
  }
`;
const CustomTablePaginationn = styled(TablePaginationUnstyled)`
  & .${classes.spacer} {
    display: none;
  }

  & .${classes.toolbar}  {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    background-color:"#fff";

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.select}{
    padding: 2px;
    border: 1px solid lightgrey;
    border-radius: 50px;
    background-color: transparent;
    color: grey[900];

    &:hover {
      background-color: AliceBlue;
    }

    &:focus {
      outline: 1px solid 
      AliceBlue
      ;
    }
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.actions} {
    padding: 2px;
    border: 1px solid  grey[200];
    border-radius: 50px;
    text-align: center;
  }

  & .${classes.actions} > button {
    margin: 0 8px;
    border: transparent;
    border-radius: 2px;
    background-color: transparent;
    color: grey[900];

    &:hover {
      background-color: AliceBlue;
    }
  }
  `
;

export default function UnstyledTable(props) {
  const rows = props.data;
  // console.log(rows);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event,
    newPage,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Root sx={{ maxWidth: '100%' }}>
      <table aria-label="custom pagination table">
        <thead>
          <tr>
          <th>Coordinates</th>
            <th>Max Temp.</th>
            <th>Min Temp.</th>
            <th>Symbol</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <tr key={uuid()} className='customRow'>
            <td style={{ width: 80 }} >
            <strong>Lat:</strong> {row.user_lat} <br/> <strong>Lon:</strong> {row.user_lon}</td>
            <td style={{ width: 50 }} >
              {row.max_tem}° C</td>
              <td style={{ width: 50 }} >
                {row.min_tem}° C
              </td>
              <td style={{ width: 50 }} >
              <img src={`../images/symbols/${row.symb}.png`} width="50" alt="symbol" />
              </td>
              <td style={{ width: 100 }}>
              <i className="fa-solid fa-chart-simple fa-xl" onClick={() => props.hourlyCharts(row)} ></i>
              <i className="fa-solid fa-pencil fa-xl" onClick={() => props.edit(row)}></i>
              <i className="fa-solid fa-trash-can fa-xl" onClick={() => props.delete(row)}></i>
              </td>

            </tr>
          ))}
          {emptyRows > 0 && (
            <tr style={{ height: 41 * emptyRows }}>
              <td colSpan={5} />
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <CustomTablePaginationn
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={5}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  'aria-label': 'rows per page',
                },
                actions: {
                  showFirstButton: true,
                  showLastButton: true,
                } ,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </tr>
        </tfoot>
      </table>
    </Root>
  );
}
