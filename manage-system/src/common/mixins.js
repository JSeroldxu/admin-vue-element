//时间格式化
var padDate = function (va) {
  va = va < 10 ? '0' + va : va;
  return va
}
export let filtersTime = {
  filters: {
    formatDate: function (val) {
      let value = new Date(val);
      let year = value.getFullYear();
      let month = padDate(value.getMonth() + 1);
      let day = padDate(value.getDate());
      let hour = padDate(value.getHours());
      let minutes = padDate(value.getMinutes());
      let seconds = padDate(value.getSeconds());
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes;
    },
    yearTime: function (val) {
      let value = new Date(val);
      let year = value.getFullYear();
      return year;
    },
    monthTime: function (val) {
      let value = new Date(val);
      let month = padDate(value.getMonth() + 1);
      let day = padDate(value.getDate());
      return month + '-' + day;
    },
    hourTime: function (val) {
      let value = new Date(val);
      let hour = padDate(value.getHours());
      let minutes = padDate(value.getMinutes());
      return hour + ':' + minutes;
    },
    yearMonthTime: function (val) {
      let value = new Date(val);
      let year = value.getFullYear();
      let month = padDate(value.getMonth() + 1);
      let day = padDate(value.getDate());
      return year + '-' + month + '-' + day
    },
    yearMonth: function (val) {
      let value = new Date(val);
      let year = value.getFullYear();
      let month = padDate(value.getMonth() + 1);
      return year + '-' + month
    },
    //变时间戳
    timestamp: function (val) {
      let value = new Date(val).valueOf();

      return value;
    },

  },
  methods: {
    //阿里云上传设置资源名
    timestamp() {
      parseInt()
      let time = new Date();
      let y = time.getFullYear();
      let m = time.getMonth() + 1;
      let d = time.getDate();
      let h = time.getHours();
      let mm = time.getMinutes();
      let s = time.getSeconds();

      return "" + y + this.add0(m) + this.add0(d) + this.add0(h) + this.add0(mm) + this.add0(s);
    },
    add0(m) {
      return m < 10 ? '0' + m : m;
    },
  }
}