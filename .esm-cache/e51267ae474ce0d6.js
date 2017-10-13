let path;_474‍.w('path',[["default",function(v){path=v}]]);let express;_474‍.w('express',[["default",function(v){express=v}]]);let cors;_474‍.w('cors',[["default",function(v){cors=v}]]);let api;_474‍.w('./api/index',[["default",function(v){api=v}]]);let staticAssets;_474‍.w('./static-assets',[["default",function(v){staticAssets=v}]]);





const app = express()
app.use(cors())
app.use('/api', api)
app.use(staticAssets)
app.get('*', serveApp)

app.listen(process.env.PORT, () =>
  console.log('Listening on ' + process.env.PORT)
)

function serveApp (request, response) {
  const file = path.join(path.join(__dirname, '../fontend/build/index.html'))
  response.status(200).sendFile(file)
}
