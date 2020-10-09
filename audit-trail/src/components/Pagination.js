import React from 'react';

export default class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          pager: {}
    }
  };

    componentWillMount() {
        if (this.props.items && this.props.items.length) {
            this.setPage(this.props.initialPage);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.items !== prevProps.items) {
            this.setPage(this.props.initialPage);
        }
    }

    setPage(page) {
        var { items, pageSize } = this.props;
        var pager = this.state.pager;
        if (page < 1 || page > pager.totalPages) {
            return;
        }
        pager = this.getPager(items.length, page, pageSize);
        var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
        this.setState({ pager: pager });
        this.props.onChangePage(pageOfItems);
    }

    getPager(totalItems, currentPage, pageSize) {
        currentPage = currentPage || 1;
        pageSize = pageSize || 25;
        var totalPages = Math.ceil(totalItems / pageSize);

        var startPage, endPage;
        if (totalPages <= 10) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
        var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    render() {
        var pager = this.state.pager;
        if (!pager.pages || pager.pages.length <= 1) {
            return null;
        }
        return (
            <div className="pagination">
                    <input type='button' value='First' className={pager.currentPage === 1 ? 'disabled' : ''} onClick={() => this.setPage(1)}/>
                    <input type='button' value='Previous' className={pager.currentPage === 1 ? 'disabled' : ''} onClick={() => this.setPage(pager.currentPage - 1)}/>
                {pager.pages.map((page, index) =>
                      <input type='button' value={page}  key={index} className={pager.currentPage === page ? 'active' : ''} onClick={() => this.setPage(page)}/>
                )}
                    <input type='button' value='Next' className={pager.currentPage === pager.totalPages ? 'disabled' : ''} onClick={() => this.setPage(pager.currentPage + 1)}/>
                    <input type='button' value='Last' className={pager.currentPage === pager.totalPages ? 'disabled' : ''} onClick={() => this.setPage(pager.totalPages)}/>
            </div>
        );
    }
}
