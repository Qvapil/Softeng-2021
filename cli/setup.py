from setuptools import setup

setup(
    name = 'SoftengCli',
    version='1.0',
    py_modules=['se2147'],
    install_requires = [
        'Click', 'Requests',
    ],
    entry_points={
        'console_scripts':['se2147=se2147:cli']
    },
)
