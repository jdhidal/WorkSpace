package models

// Reservation representa una reserva en la base de datos
type Reservation struct {
	ID              uint   `json:"id"`
	FacilityName    string `json:"facility_name"`
	UserName        string `json:"user_name"`
	ReservationDate string `json:"reservation_date"`
	Status          string `json:"status"`
}

// TableName especifica el nombre de la tabla en la base de datos
func (Reservation) TableName() string {
	return "reservations"
}
