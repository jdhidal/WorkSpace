class CoworkingSpace
    def self.delete(id)
      DB.exec("SELECT delete_coworking_space($1)", [id])
    end
  end