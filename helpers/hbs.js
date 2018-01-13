const moment = require('moment');

module.exports = {
  truncate: function(str, len) {
    if (str.length > len) {
      let new_str = str.substr(0, len);
      return `${new_str}...`
    }
    return str;
  },
  edit: function(monitorUser, loggedUser, monitorId) {
    if (monitorUser === loggedUser) {
      return `<a href="/monitors/edit/${monitorId}" class="monitor_button monitor_edit btn btn-primary float-left mr-2">Edit</a>
      <form action="/monitors/${monitorId}?_method=DELETE" method="post">
        <input type="hidden" name="_method" value="DELETE">
        <input type="submit" class="monitor_button monitor_delete btn btn-danger" value="Delete">
      </form>`
    } else {
      return ``
    }
  },
  formatDate: function(date, format) {
    return moment(date).format(format)
  }
}