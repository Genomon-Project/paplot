# Tests

## このディレクトリについて

このディレクトリには試験用のスクリプトがおいてあり、以下の構成になっています。

ディレクトリ

 - python ... 入力ファイルからレポートを作成する機能についてのテストコードです。
 - js (javascript) ... 出力されたレポートについてのテストコードです。
 - dataset ... 入力ファイルと設定ファイル群です。
 - example ... チュートリアルのサンプルデータのビルドに使用します。
 - ref ... 出力レポートの正解データです。

ファイル

 - .istanbul.yml ... jsのカバレッジ計算ツールの設定ファイルです。
 - build.sh ... サンプルデータからレポートを作成します。
 - Dockerfile .. 試験環境構築に必要であれば使用します。
 - package.json ... jsの試験環境構築に作成します。 `npm install` で自動的に読み込まれます。
 - package-lock.json ... `npm install` で自動的に作成されます。
 - README.md ... このファイルです。
 - sonar-scanner.properties ... sonarの設定ファイルひな型です。実際には使用しません。

## テスト実行方法

### 全体の流れ

1. pythonスクリプトの試験を行い、併せてカバレッジも計算します。
2. javascriptスクリプトの試験を行い、併せてカバレッジも計算します。
3. pythonスクリプトとjavascriptスクリプト、およびそれらのカバレッジをsonarcloudに上げて静的解析を行います。

### 環境

pythonとNode.jsが動くマシンが必要です。

主にこのように用意します。

```
$ docker pull node:latest
$ docker run -it -v /path/to/paplot:/work "/bin/bash"

(dockerコンテナの中)# curl -kL https://bootstrap.pypa.io/get-pip.py | python
```

### python

coverageをインストールします。

```
pip install coverage

mkdir -p /home/travis/build/aokad/paplot/tests/dataset
cp -r /work/tests/dataset/mutation/ /home/travis/build/aokad/paplot/tests/dataset/
```

setup.py があるディレクトリで実行します。

```
coverage run --source=./scripts setup.py test
coverage xml
```

`.coverage` にカバレッジが出力されています。sonarcloudにはこれをxmlに変換した `coverage.xml` を登録します。

オプションでHTMLレポートに作成します。

```
coverage html
```

%だけでよければコンソールに表示することもできます。

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

### javascript

npm が有効なマシンが必要です。

tests ディレクトリ (このディレクトリ) でnpmの環境をインストールします。

```
npm install
```

インストールされたモジュールはtests/node_modulesに入っています。

テストを実行します。

```
npm test
```

tests/coverageに結果が出力されています。
/tests/coverage/lcov.info をsonarcloudに登録します。

## sonarcloud

静的解析を行います。

ここから最新版を取得して解凍し、paplotディレクトリ直下に置きます。
see https://about.sonarcloud.io/get-started/

設定ファイルを編集します。(sonar-scanner-3.0.3.778の場合)

sonar-scanner-cli-3.0.3.778-linux/sonar-scanner-3.0.3.778-linux/conf/sonar-scanner.properties

```
sonar.host.url=https://sonarcloud.io

sonar.organization=xxxx
sonar.login=xxxx

sonar.javascript.lcov.reportPaths=tests/coverage/lcov.info,.coverage
sonar.projectKey=paplot_devel
sonar.sources=. 
sonar.inclusions=paplot,scripts/*.py,scripts/paplot/*.py,scripts/paplot/subcode/*.py,tests/src/js/*.js,tests/src/html/*.js
```

実行します。

```
sonar-scanner-cli-3.0.3.778-linux/sonar-scanner-3.0.3.778-linux/bin/sonar-scanner
```

## docker版

まずpaplotをダウンロードします。

```
git clone <paplot.git>
cd paplot/test
docker build -t aokad/paplot-test:0.5.6 .
docker run -v /c/Users/Okada/***/paplot/:/work aokad/paplot-test:0.5.6
```

sonarcloudだけ手動でやります。
