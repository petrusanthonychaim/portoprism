npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p


TABLE "Profiles" {
  id SERIAL [PRIMARY KEY]
  profileName
  address
  mobile
  email
  rdn
  currency
  npwp
  capital 
  UserId 
}

TABLE "Users" {
  id SERIAL [PRIMARY KEY]
  email 
  password 
  role 
}

TABLE "Stocks" {
  id SERIAL [PRIMARY KEY]s
  code 
  stockName 
  price 
  shares 
  ProfileId 
  SectorId 
}


TABLE "Sectors" {
  id SERIAL [PRIMARY KEY]
  sectorName VARCHAR  
}

Ref : Profiles.UserId - Users.id
Ref : Profiles.id < Stocks.ProfileId
Ref : Stocks.SectorId > Sectors.id