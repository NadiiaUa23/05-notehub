import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";
import type { PaginationProps } from "../../types/note";

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
