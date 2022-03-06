import click
import csv
from datetime import datetime
import pip._vendor.requests as requests
import json

@click.group()
def cli():
    """\b
        -----------------------------------------------
        This is our CLI for Toltag.

        \b
        For more information about each command, type:

            se2147 [COMMAND] --help

        ------------------------------------------------
    """
    pass

@click.command()
def healthcheck():

    """\b
        ---------------------------------------------------
        This command checks the end-to-end connectivity
        between user and database.
        System's health status is "OK" on success and
        "failed" on failure.

        ----------------------------------------------------
    """
    res = requests.get('http://localhost:9103/interoperability/api/admin/healthcheck')
    click.echo(res.status_code)
    click.echo(res.json())

@click.command()
def resetpasses():

    """\b
        ---------------------------------------------------
        This command resets passes. All passes records
        will be deleted.

        ----------------------------------------------------
    """

    res = requests.post('http://localhost:9103/interoperability/api/admin/resetpasses')
    click.echo(res.status_code)
    click.echo(res.json())

@click.command()
def resetstations():

    """\b
        ---------------------------------------------------
        This command resets stations. All station records
        will be deleted.

        ----------------------------------------------------
    """

    res = requests.post('http://localhost:9103/interoperability/api/admin/resetstations')
    click.echo(res.status_code)
    click.echo(res.json())

@click.command()
def resetvehicles():

    """\b
        ---------------------------------------------------
        This command resets vehicles. All vehicle records
        will be deleted.

        ----------------------------------------------------
    """

    res = requests.post('http://localhost:9103/interoperability/api/admin/resetvehicles')
    click.echo(res.status_code)
    click.echo(res.json())

@click.command()
@click.option('--passesupd', help = 'Upload a csv file for passes update', required='True', is_flag='True', metavar='')
@click.option('--source', help = 'Upload a csv file for passes update - required in --passesupd', required = 'True', metavar = '<filename>')
def admin(passesupd, source):

    """\b
        -----------------------------------------------------
        The use of --passesupd parameter adds new passes data,
        "uploading" the given csv file. The name of the file
        is stated in the --source argument.

        ------------------------------------------------------
    """
    f = open(source)
    check = False
    passes = csv.reader(f, delimiter=";")
    #passes = csv.reader(f)
    skipHeader = True
    for row in passes:
        if skipHeader:
            skipHeader = False
            continue
        passID = row[0]
        vehicleID = row[3]
        stationID = row[2]
        timestamp = datetime.strptime(row[1] , "%d/%m/%Y %H:%M").strftime("%Y%m%d%H%M")
        amount_charged = row[4]
        euros = amount_charged.split(".")[0]
        cents = amount_charged.split(".")[1]
        url = 'http://localhost:9103/interoperability/api/admin/passUpdate/' + passID + '/' + vehicleID + '/' + stationID + '/' + timestamp +'00'+'/' + euros + '/'+ cents
        res = requests.post(url)
        if res.status_code != 200:
            click.echo(res.status_code)
            click.echo(res.json())
            f.close()
            return True
    click.echo(res.status_code)
    f.close()
    return True

@click.command()
@click.option('--station', help = 'Choose station id', required = 'True', metavar='<station_ID>')
@click.option('--datefrom', help = 'Choose starting date', required = 'True', metavar = '[YYYYMMDD]')
@click.option('--dateto', help = 'Choose ending date', required = 'True', metavar = '[YYYYMMDD]')
@click.option('--format', help = 'Choose format (json or csv)', required = 'True', metavar = '[csv/json]')
def passesperstation(station, datefrom, dateto, format):

    """\b
        ----------------------------------------------------
        This command displays all passes from the given
        station, during the given period of time.

        NOTE: Date options must be chronologically correct.

        ----------------------------------------------------
    """

    url = 'http://localhost:9103/interoperability/api/PassesPerStation/' + station + '/' + datefrom + '/' + dateto
    if(format == 'csv'):
        url = url + '?format=csv'

    res = requests.get(url)
    click.echo(res.status_code)
    if(format == 'json' and res.status_code == 200):
        click.echo(json.dumps(res.json()))
    elif(format == 'csv' and res.status_code == 200):
        click.echo(res.content)
    return True

@click.command()
@click.option('--op1', help = 'Choose first operator', required = 'True', metavar = '<operator_name>')
@click.option('--op2', help = 'Choose second operator', required = 'True', metavar = '<operator_name>')
@click.option('--datefrom', help = 'Choose starting date', required = 'True', metavar = '[YYYYMMDD]')
@click.option('--dateto', help = 'Choose ending date', required = 'True', metavar = '[YYYYMMDD]')
@click.option('--format', help = 'Choose format (json or csv)', required = 'True', metavar = '[csv/json]')

def passesanalysis(op1, op2, datefrom, dateto, format):

    """\b
        ----------------------------------------------------
        This command displays an analysis of all the passes
        of op2-tag from op1-stations, during the given period
        of time.

        NOTE: Date options must be chronologically correct.

        ----------------------------------------------------
    """

    url = 'http://localhost:9103/interoperability/api/PassesAnalysis/' + op1 + '/' + op2 + '/' + datefrom + '/' + dateto
    if(format == 'csv'):
        url = url + '?format=csv'

    res = requests.get(url)
    click.echo(res.status_code)
    if(format == 'json' and res.status_code == 200):
        click.echo(json.dumps(res.json()))
    elif(format == 'csv' and res.status_code == 200):
        click.echo(res.content)
    return True

@click.command()
@click.option('--op1', help = 'Choose first operator', required = 'True', metavar = '<operator_name>')
@click.option('--op2', help = 'Choose second operator', required = 'True', metavar = '<operator_name>')
@click.option('--datefrom', help = 'Choose starting date', required = 'True', metavar = '[YYYYMMDD]')
@click.option('--dateto', help = 'Choose ending date', required = 'True', metavar = '[YYYYMMDD]')
@click.option('--format', help = 'Choose format (json or csv)',  required = 'True', metavar = '[csv/json]')

def passescost(op1, op2, datefrom, dateto, format):

    """\b
        ----------------------------------------------------
        This command displays the number and cost of all the
        passes of op2-tag from op1-stations, during the given
        period of time.

        NOTE: Date options must be chronologically correct.

        ----------------------------------------------------
    """

    url = 'http://localhost:9103/interoperability/api/PassesCost/' + op1 + '/' + op2 + '/' + datefrom + '/' + dateto
    if(format == 'csv'):
        url = url + '?format=csv'

    res = requests.get(url)
    click.echo(res.status_code)
    if(format == 'json' and res.status_code == 200):
        click.echo(json.dumps(res.json()))
    elif(format == 'csv' and res.status_code == 200):
        click.echo(res.content)
    return True

@click.command()
@click.option('--op1', help = 'Choose second operator', required = 'True', metavar = '<operator_name>')
@click.option('--datefrom', help = 'Choose starting date', required = 'True', metavar = '[YYYYMMDD]')
@click.option('--dateto', help = 'Choose ending date', required = 'True', metavar = '[YYYYMMDD]')
@click.option('--format', help = 'Choose format (json or csv)',  required = 'True', metavar = '[csv/json]')

def chargesby(op1, datefrom, dateto, format):

    """\b
        ----------------------------------------------------
        This command displays the number and cost of passes
        from op1-stations, during the given period of time.

        NOTE: Date options must be chronologically correct.

        ----------------------------------------------------
    """

    url = 'http://localhost:9103/interoperability/api/ChargesBy/' + op1 +  '/' + datefrom + '/' + dateto
    if(format == 'csv'):
        url = url + '?format=csv'

    res = requests.get(url)
    click.echo(res.status_code)
    if(format == 'json' and res.status_code == 200):
        click.echo(json.dumps(res.json()))
    elif(format == 'csv' and res.status_code == 200):
        click.echo(res.content)
    return True


cli.add_command(healthcheck)
cli.add_command(resetpasses)
cli.add_command(resetstations)
cli.add_command(resetvehicles)
cli.add_command(passesperstation)
cli.add_command(passesanalysis)
cli.add_command(passescost)
cli.add_command(chargesby)
cli.add_command(admin)

if __name__ == "__main__":
    cli()
