FROM node:9.2.0

MAINTAINER aokad <aokad@hgc.jp>

RUN curl -kL https://bootstrap.pypa.io/get-pip.py | python && \
    pip install coverage && \
    apt-get -y update && \
    apt-get install -y wget unzip && \
    
    \
    echo "#!/bin/bash"                                                                                                > /run.sh && \
    echo "cd /work/"                                                                                                 >> /run.sh && \
    \
    echo "python setup.py build install"                                                                             >> /run.sh && \
    \
    echo "mkdir -p /home/travis/build/Genomon-Project/paplot/tests/dataset"                                          >> /run.sh && \
    echo "mkdir -p /home/travis/build/Genomon-Project/paplot/tests/example"                                          >> /run.sh && \
    echo "cp -r /work/tests/dataset/mutation/ /home/travis/build/Genomon-Project/paplot/tests/dataset/"              >> /run.sh && \
    echo "cp -r /work/tests/example/mutation_subplot/ /home/travis/build/Genomon-Project/paplot/tests/example/"      >> /run.sh && \
    \
    echo "coverage run --source=./scripts setup.py test"                                                             >> /run.sh && \
    echo "coverage xml"                                                                                              >> /run.sh && \
    echo "coverage report"                                                                                           >> /run.sh && \
    echo "bash tests/build_example.sh"                                                                               >> /run.sh && \
    echo "cd tests"                                                                                                  >> /run.sh && \
    echo "npm install"                                                                                               >> /run.sh && \
    echo "npm test"                                                                                                  >> /run.sh && \
    \
    echo "#!/bin/bash"                                                                                                > /sonar.sh && \
    echo "cd /work/"                                                                                                 >> /sonar.sh && \
    \
    echo "wget https://sonarsource.bintray.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-3.0.3.778-linux.zip" >> /sonar.sh && \
    echo "unzip sonar-scanner-cli-3.0.3.778-linux.zip"                                                               >> /sonar.sh && \
    echo "export PATH=/work/sonar-scanner-3.0.3.778-linux/bin:$PATH"                                                 >> /sonar.sh && \
    echo "sonar-scanner -Dsonar.host.url=https://sonarcloud.io -Dsonar.projectKey=paplot -Dsonar.sources=. -Dsonar.inclusions=paplot,scripts/*.py,scripts/paplot/*.py,scripts/paplot/subcode/*.py,tests/src/js/*.js,tests/src/html/*.js -Dsonar.python.coverage.reportPath=coverage.xml -Dsonar.javascript.lcov.reportPaths=tests/coverage/lcov.info -Dsonar.organization=${SONNAR_KEY} -Dsonar.login=${SONNAR_TOKEN};" >> /sonar.sh && \
    \
    chmod 744 /run.sh && \
    chmod 744 /sonar.sh
    
CMD ["/run.sh"]
