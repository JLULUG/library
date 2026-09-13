#!/bin/bash
CSV_PATH="https://docs.google.com/spreadsheets/d/e/2PACX-1vTSdVSCgLkM5tbYLlOaOSJ2Z4TxfKczVR4K2pDMBQg16biVeJnQT3YQmTAwfFLvfySZ7lmYQCHq1ngb/pub?gid=1274771979&single=true&output=csv" > data.csv
curl -L -o data.csv $CSV_PATH || exit 1
python3 csv2json.py < data.csv > data.json
