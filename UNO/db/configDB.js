const configDB = {}

configDB.PORT = process.env.PORT || 3000

configDB.host = 'localhost'
configDB.port = 5432
configDB.name = 'rummydb'
configDB.user = 'postgres'
configDB.pw = 'DRFB_S17'

module.exports = configDB
