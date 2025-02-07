go mod init availability-management/list-availability

go get github.com/gin-gonic/gin
go get github.com/lib/pq
go get github.com/joho/godotenv
go get -u github.com/swaggo/swag/cmd/swag
go get -u github.com/gin-gonic/gin
go get -u github.com/swaggo/gin-swagger
go get -u github.com/swaggo/gin-swagger/swaggerFiles
go get -u github.com/gin-contrib/cors



curl -X GET "http://localhost:3008/availability/1"
