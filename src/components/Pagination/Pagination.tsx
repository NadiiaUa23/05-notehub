import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number; // скільки всього сторінок
  page: number; // поточна сторінка (1-базована)
  onPageChange: (nextPage: number) => void;
}

export default function Pagination({
  pageCount,
  page,
  onPageChange,
}: PaginationProps) {
  return (
    <nav className={css.pagination}>
      <ReactPaginate
        pageCount={pageCount}
        forcePage={page - 1} // react-paginate 0-базований
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={(e) => onPageChange(e.selected + 1)}
        previousLabel="←"
        nextLabel="→"
        containerClassName={css.pagination}
        pageClassName={css.page}
        activeClassName={css.active}
        previousClassName={css.prev}
        nextClassName={css.next}
        breakClassName={css.break}
        renderOnZeroPageCount={null}
      />
    </nav>
  );
}
