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
    chmod 744 /run.sh
    
CMD ["/run.sh"]
