let path;_f2e‍.w('path',[["default",function(v){path=v}]]);let ecstatic;_f2e‍.w('ecstatic',[["default",function(v){ecstatic=v}]]);


_f2e‍.d(ecstatic({
  root: path.join(__dirname, '../frontend/build'),
  handleError: false,
  showDir: false,
  gzip: true,
  cache: 604800000 // 1000 * 3600 * 24 * 7 == one week in milliseconds
}));
