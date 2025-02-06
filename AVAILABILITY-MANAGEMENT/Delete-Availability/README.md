go mod init availability-management/delete-availability

go get github.com/gin-gonic/gin
go get github.com/lib/pq
go get github.com/joho/godotenv
go get -u github.com/swaggo/swag/cmd/swag
go get -u github.com/gin-gonic/gin
go get -u github.com/swaggo/gin-swagger
go get -u github.com/swaggo/gin-swagger/swaggerFiles


curl -X DELETE "http://localhost:3009/availability/3"

