import csv
import mysql.connector
from datetime import datetime
# import MySQL

##### Function to flush the database reset database

def flush_db(curs):
    curs.execute('DELETE FROM pass');
    curs.execute('DELETE FROM owns');
    curs.execute('DELETE FROM tag');
    curs.execute('DELETE FROM station');
    curs.execute('DELETE FROM provider');
    curs.execute('DELETE FROM vehicle');

######

mydb = mysql.connector.connect(host='localhost',user='user',passwd='',db='tolltag')

cur = mydb.cursor()

flush_db(cur)

file1 = open('..\Sample_data\sampledata01_passes100_8000.csv')
file2 = open('..\Sample_data\sampledata01_stations.csv')
file3 = open('..\Sample_data\sampledata01_vehicles_100.csv')
file4 = open('..\Sample_data\provider.csv')

passes = csv.reader(file1)
stations = csv.reader(file2)
vehicles = csv.reader(file3)
providers = csv.reader(file4)

# We have a list for each table of the database

prov = [] #for provider

skipHeader = True
for row in providers:
    if skipHeader:
        skipHeader = False
        continue
    # print(row)
    prov.append(row[0])
    prov.append(row[1])
    # print(veh)
    cur.execute('INSERT INTO provider(provider_name,provider_abbr)' 'VALUES(%s,%s)', prov)
    prov = []

stat = [] #for station
own = [] #for owns

skipHeader = True
for row in stations:
    if skipHeader:
        skipHeader = False
        continue
    stat.append(row[0])
    stat.append(row[2])
    own.append(row[1])
    own.append(row[0])
    cur.execute('INSERT INTO station(station_id,station_name)' 'VALUES(%s,%s)', stat)
    cur.execute('INSERT INTO owns(provider_name,station_id)' 'VALUES(%s,%s)', own)
    stat = []
    own = []

veh = [] #for vehicle
tags = [] #for tag

skipHeader = True
for row in vehicles:
    if skipHeader:
        skipHeader = False
        continue
    veh.append(row[0])
    veh.append(row[4])
    tags.append(row[1])
    tags.append(row[0])
    tags.append(row[2])
    cur.execute('INSERT INTO vehicle(vehicle_id,licence_year)' 'VALUES(%s,%s)', veh)
    cur.execute('INSERT INTO tag(tag_id,vehicle_id,provider_name)' 'VALUES(%s,%s,%s)', tags)
    tags = []
    veh = []

passs = [] #for pass

skipHeader = True
for row in passes:
    if skipHeader:
        skipHeader = False
        continue
    passs.append(row[0])
    passs.append(row[3])
    passs.append(row[2])
    date_time_obj = datetime.strptime(row[1] , "%d/%m/%Y %H:%M").strftime("%Y/%m/%d %H:%M")
    passs.append(date_time_obj)
    passs.append(row[4])
    cur.execute('INSERT INTO pass(pass_id,vehicle_id,station_id,time_stamp,amount_charged)' 'VALUES(%s,%s,%s,%s,%s)', passs)
    passs = []

mydb.commit()
cur.close()
file1.close()
file2.close()
file3.close()
file4.close()
#print("OK")
