<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

class DB

{

    private static $writeDBConnection;

    private static $readDBConnection;



    public static function connectWriteDB()

    {

        if (self::$writeDBConnection === null) {

            self::$writeDBConnection = new PDO('mysql:host=127.0.0.1:3306;dbname=bus-tickets;charset=utf8', 'root', '5834262Linq!');

            //self::$writeDBConnection = new PDO('mysql:host=127.0.0.1:8889;dbname=mtn_lone_star_db;charset=utf8', 'rex', 'Qwerty101');

            self::$writeDBConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            self::$writeDBConnection->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        }



        return self::$writeDBConnection;
    }



    public static function connectReadDB()

    {

        if (self::$readDBConnection === null) {

            // self::$readDBConnection = new PDO('pgsql:host=173.230.157.141;port=5432;dbname=mtn_lone_star_db', 'postgres', 'xtralat@2020');

            self::$readDBConnection = new PDO('mysql:host=127.0.0.1:3306;dbname=bus-tickets;charset=utf8', 'root', '5834262Linq!');

            self::$readDBConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            self::$readDBConnection->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        }
        return self::$readDBConnection;
    }
}
