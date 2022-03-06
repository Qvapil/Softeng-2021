from subprocess import PIPE, Popen

# passesperstation test for 1 month of passes
command="se2147 passesperstation --station AO01 --datefrom 20211101 --dateto 20211130 --format json"
process = Popen(command, shell=True, stdout=PIPE, stderr=PIPE)
producedOutput,err=process.communicate()
raw_out=producedOutput.decode("utf-8")
raw_out=raw_out[5:-4]
raw_split=raw_out.partition('"RequestTimeStamp": ')
raw_split2=raw_split[2].partition('"PeriodFrom":')
out=raw_split[0]+raw_split2[1]+raw_split2[2]
output='[{"Station": "aodos tolls station 01", "StationOperator": "aodos", "PeriodFrom": "2021-11-01", "PeriodTo": "2021-11-30", "NumberOfPasses": 7, "PassesList": [{"PassIndex": 1, "PassID": "FNW1817015", "PassTimeStamp": "2021-11-10T05:39:00.000Z", "VehicleID": "RR73DWB65452", "TagProvider": "aodos", "PassType": "home", "PassCharge": 2.8}, {"PassIndex": 2, "PassID": "SBD6026250", "PassTimeStamp": "2021-11-01T11:35:00.000Z", "VehicleID": "PE73VJU23485", "TagProvider": "aodos", "PassType": "home", "PassCharge": 2.8}, {"PassIndex": 3, "PassID": "SMZ7151735", "PassTimeStamp": "2021-11-10T16:58:00.000Z", "VehicleID": "BK77KNV91142", "TagProvider": "olympia_odos", "PassType": "visitor", "PassCharge": 2.8}, {"PassIndex": 4, "PassID": "TDF6930764", "PassTimeStamp": "2021-11-13T16:31:00.000Z", "VehicleID": "MX39VOS38645", "TagProvider": "aodos", "PassType": "home", "PassCharge": 2.8}, {"PassIndex": 5, "PassID": "VYS1216734", "PassTimeStamp": "2021-11-09T23:05:00.000Z", "VehicleID": "NO82BAX82566", "TagProvider": "nea_odos", "PassType": "visitor", "PassCharge": 2.8}, {"PassIndex": 6, "PassID": "ZVC9278425", "PassTimeStamp": "2021-11-15T04:25:00.000Z", "VehicleID": "BZ76ROL87339", "TagProvider": "aodos", "PassType": "home", "PassCharge": 1}, {"PassIndex": 7, "PassID": "ZXR5575054", "PassTimeStamp": "2021-11-08T19:15:00.000Z", "VehicleID": "BM25PHF40639", "TagProvider": "aodos", "PassType": "home", "PassCharge": 13}]'
if output==out:
    print("passesperstation test 1 correct")
else:
    print("passesperstation test 1 wrong")

# passesperstation test for 0 passes
command="se2147 passesperstation --station AO01 --datefrom 20211101 --dateto 20211101 --format json"
process=Popen(command, shell=True, stdout=PIPE, stderr=PIPE)
producedOutput,err=process.communicate()
raw_out=producedOutput.decode("utf-8")
if(raw_out[:3]=="402"):
    print("passesperstation test 2 correct")
else:
    print("passesperstation test 2 wrong")

# passesanalysis test
command="se2147 passesanalysis --op1 aodos --op2 egnatia --datefrom 20210101 --dateto 20210201 --format json"
process=Popen(command, shell=True, stdout=PIPE, stderr=PIPE)
producedOutput,err=process.communicate()
raw_out=producedOutput.decode("utf-8")
raw_out=raw_out[5:-2]
raw_split=raw_out.partition('"RequestTimeStamp": ')
raw_split2=raw_split[2].partition('"PeriodFrom":')
out=raw_split[0]+raw_split2[1]+raw_split2[2]
output='[{"op1_ID": "aodos", "op2_ID": "egnatia", "PeriodFrom": "2021-01-01", "PeriodTo": "2021-02-01", "NumberOfPasses": 5, "PassesList": [{"PassIndex": 1, "PassID": "AEW7495447", "StationID": "AO12", "PassTimeStamp": "2021-01-06T19:46:00.000Z", "VehicleID": "IW53OQE31439", "Charge": 2.8}, {"PassIndex": 2, "PassID": "XCD3167378", "StationID": "AO07", "PassTimeStamp": "2021-01-23T05:07:00.000Z", "VehicleID": "IW53OQE31439", "Charge": 2.8}, {"PassIndex": 3, "PassID": "OQZ0564616", "StationID": "AO18", "PassTimeStamp": "2021-01-26T04:42:00.000Z", "VehicleID": "DW44ZOO26361", "Charge": 2.8}, {"PassIndex": 4, "PassID": "KSK4108960", "StationID": "AO18", "PassTimeStamp": "2021-01-25T21:35:00.000Z", "VehicleID": "VL67TFO75321", "Charge": 2.8}, {"PassIndex": 5, "PassID": "KZI8070958", "StationID": "AO01", "PassTimeStamp": "2021-01-06T16:05:00.000Z", "VehicleID": "VL67TFO75321", "Charge": 2.8}]}]'
if out==output:
    print("passesanalysis test 1 correct")
else:
    print("passesanalysis test 1 wrong")

# passesanalysis test for 0 passes
command="se2147 passesanalysis --op1 nea_odos --op2 kentriki_odos --datefrom 20201201 --dateto 20201201 --format json"
process=Popen(command, shell=True, stdout=PIPE, stderr=PIPE)
producedOutput,err=process.communicate()
raw_out=producedOutput.decode("utf-8")
if(raw_out[:3]=="402"):
    print("passesanalysis test 2 correct")
else:
    print("passesanalysis test 2 wrong")

# passescost test
command="se2147 passescost --op1 egnatia --op2 kentriki_odos --datefrom 20210101 --dateto 20210201 --format json"
process=Popen(command, shell=True, stdout=PIPE, stderr=PIPE)
producedOutput,err=process.communicate()
raw_out=producedOutput.decode("utf-8")
raw_out=raw_out[5:-2]
raw_split=raw_out.partition('"RequestTimeStamp": ')
raw_split2=raw_split[2].partition('"PeriodFrom":')
out=raw_split[0]+raw_split2[1]+raw_split2[2]
output='[{"op1_ID": "egnatia", "op2_ID": "kentriki_odos", "PeriodFrom": "2021-01-01", "PeriodTo": "2021-02-01", "NumberOfPasses": 3, "PassesCost": 6.25}]'
if out==output:
    print("passescost test 1 correct")
else:
    print("passescost test 1 wrong")

# passescost test for no data
command="se2147 passescost --op1 olympia_odos --op2 aodos --datefrom 20200101 --dateto 20200201 --format json"
process=Popen(command, shell=True, stdout=PIPE, stderr=PIPE)
producedOutput,err=process.communicate()
raw_out=producedOutput.decode("utf-8")
if(raw_out[:3]=="402"):
    print("passescost test 2 correct")
else:
    print("passescost test 2 wrong")

# chargesby test
command="se2147 chargesby --op1 nea_odos --datefrom 20211101 --dateto 20211201 --format json"
process=Popen(command, shell=True, stdout=PIPE, stderr=PIPE)
producedOutput,err=process.communicate()
raw_out=producedOutput.decode("utf-8")
raw_out=raw_out[5:-2]
raw_split=raw_out.partition('"RequestTimeStamp": ')
raw_split2=raw_split[2].partition('"PeriodFrom":')
out=raw_split[0]+raw_split2[1]+raw_split2[2]
output='[{"op_ID": "nea_odos", "PeriodFrom": "2021-11-01", "PeriodTo": "2021-12-01", "PPOList": [{"VisitingOperator": "kentriki_odos", "NumberOfPasses": 3, "PassesCost": 4.25}, {"VisitingOperator": "aodos", "NumberOfPasses": 3, "PassesCost": 5.8}, {"VisitingOperator": "gefyra", "NumberOfPasses": 3, "PassesCost": 4.95}, {"VisitingOperator": "egnatia", "NumberOfPasses": 1, "PassesCost": 3.1}, {"VisitingOperator": "moreas", "NumberOfPasses": 1, "PassesCost": 2.2}]}]'
if out==output:
    print("chargesby test correct")
else:
    print("chargesby test wrong")
