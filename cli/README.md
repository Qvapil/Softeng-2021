# CLI 

Contents:

- Command line interface (CLI)
- Set-up
- Commands
- Tests

----------------------------------------
## Command Line Interface (CLI)

With our Command Line Interface the user may run console commands to access the data. The application works as a client of our REST API and supports json as well as csv.

---------------------------------------
## Set-up

Open a command line prompt and go to this directory.

Set up CLI using the following command:

 `pip install --editable .`

This command runs *setup.py* creating a CLI called se2147.
The file *se2147.py* has the code for each command.

----------------------------------------
## Commands

General template:

`se2147 [COMMAND] --param1 value1  [--param2 value2 ...] --format fff`

Running `se2147 --help` displays a list of all available commands, and running
`se2147 [COMMAND] --help` displays information about each command and its parameters.


Note: For the admin endpoint with parameters --passesupd and --source, the source parameter takes a csv file. Depending on whether said file uses commas (",") or semicolons (";") as separators, use the corresponding command and place the other in a comment ("passes = csv.reader(f)" for "," or "passes = csv.reader(f, delimiter=" ; ")" for " ; ").

-----------------------------------------
## Testing
File cli_test.py contains automated tests for the CLI written in python.
