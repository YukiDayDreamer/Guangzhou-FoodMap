var List = function () {
    this.activeItem = null;
    this.items = $('#listContainer>.summaryItem');  // enumerate items
};

List.prototype = {
    /**
     * scroll element into view
     * @param {Number} index
     */
    switchItem : function (index) {
        this.activeItem = this.items[index];
//        this.activeItem.scrollIntoView();
        window.scrollTo(0, this.activeItem.offsetTop);  // make up the height of menu
    }
};