package models

type Reservation struct {
	ID              uint   `json:"id"`
	FacilityName    string `json:"facility_name"`
	UserName        string `json:"user_name"`
	ReservationDate string `json:"reservation_date"`
	Status          string `json:"status"`
}

func (Reservation) TableName() string {
	return "reservations"
}
