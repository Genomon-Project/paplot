# Tests

## 1. About this directory

This directory contains test scripts, which are organized as follows.

directory

 - python ... Test scripts for source code written in python.
 - js ... Test scripts for source code written in javascript.
 - dataset ... Input files and setting files for tests.
 - example ... Example data of the tutorial.
 - ref ... Correct answer data of output report.

ファイル

 - .istanbul.yml ... configuration file of istanbul (javascript coverage calculation tool).
 - build.sh ... Create a report from the example data.
 - Dockerfile .. Use it if necessary for building the test environment.
 - package.json ... Create a test environment for js. It is automatically loaded by `npm install`.
 - package-lock.json ... It is created automatically by `npm install`.
 - README.md ... This file.

## 2. Test execution method

### 2-1. Overall flow

1. Test the python script and calculate the coverage.
2. Test javascript scripts and calculate coverage.
3. Python script, javascript script, their coverage and static analysis are uploaded to sonarcloud.

### 2-2. Machine

Prepare the machine on which python and Node.js run.

```
$ docker pull node:latest
$ docker run -it -v /path/to/paplot:/work "/bin/bash"

(In container)# curl -kL https://bootstrap.pypa.io/get-pip.py | python
```

### 2-3. Test python

Install coverage tool.

```
pip install coverage

mkdir -p /home/travis/build/Genomon-Project/paplot/tests/dataset
cp -r /work/tests/dataset/mutation/ /home/travis/build/Genomon-Project/paplot/tests/dataset/
```

Run coverage

```
coverage run --source=./scripts setup.py test
```

Coverage is output to `.coverage`.
In sonarcloud register `coverage.xml` which converted `.coverage` to xml.

```
coverage xml
```

Optionally create it in the HTML report.

```
coverage html
```

It can also be displayed on the console.

```
coverage report
Name                                   Stmts   Miss  Cover
----------------------------------------------------------
scripts/__init__.py                        0      0   100%
scripts/paplot/__init__.py                 1      0   100%
scripts/paplot/ca.py                     247    247     0%
scripts/paplot/color.py                  117     94    20%
scripts/paplot/convert.py                131     70    47%
scripts/paplot/mutation.py               276    276     0%
scripts/paplot/pmsignature.py            110     11    90%
scripts/paplot/prep.py                   186     57    69%
scripts/paplot/qc.py                     113    113     0%
scripts/paplot/run.py                    111     85    23%
scripts/paplot/signature.py              122    122     0%
scripts/paplot/subcode/__init__.py         0      0   100%
scripts/paplot/subcode/data_frame.py     195    195     0%
scripts/paplot/subcode/merge.py          250    240     4%
scripts/paplot/subcode/tools.py          114     59    48%
----------------------------------------------------------
TOTAL                                   1973   1569    20%
```

### 2-4. Test javascript

Install the npm modules with `tests` directory.

```
npm install
```

Run test.

```
npm test
```

The result is output to `tests/coverage` .
Register sonarcloud `/tests/coverage/lcov.info` (explain later).

### 2-5, Upload sonarcloud

We use sonarcloud for static analysis.

Acquire the latest version from [here]( https://about.sonarcloud.io/get-started/), and decompress it, and put it under the paplot root directory.

Edit configure file (In the case of sonar-scanner-3.0.3.778)

sonar-scanner-cli-3.0.3.778-linux/sonar-scanner-3.0.3.778-linux/conf/sonar-scanner.properties

```
sonar.host.url=https://sonarcloud.io

sonar.organization=xxxx
sonar.login=xxxx

sonar.javascript.lcov.reportPaths=tests/coverage/lcov.info,.coverage
sonar.projectKey=paplot
sonar.sources=. 
sonar.inclusions=paplot,scripts/*.py,scripts/paplot/*.py,scripts/paplot/subcode/*.py,tests/src/js/*.js,tests/src/html/*.js
```

Run sonar-scanner.

```
sonar-scanner-cli-3.0.3.778-linux/sonar-scanner-3.0.3.778-linux/bin/sonar-scanner
```

## [OPTION] 3. How to use Dockerfile

```
git clone https://github.com/aokad/paplot.git
cd paplot/test
docker build -t paplot-test:0.5.6 .
docker run -it -v {your paplot root directory}:/work paplot-test:0.5.6 /bin/bash

(In container)# bash run.sh
```

I only do sonarcloud manually.
(see 2-5, Upload sonarcloud)
