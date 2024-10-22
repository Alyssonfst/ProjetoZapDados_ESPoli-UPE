FROM gru.ocir.io/ida2ybigzy5m/green-jdk17

LABEL APPLICATION="zapdados-back"
LABEL MAINTAINER="zapdados.com.br <infraestrutura at zapdados.com.br>"

ARG TARGET_APP=target/zapdados*.jar
ARG DEST_APP=/zapdados/app.jar

ARG TARGET_ENTRYPOINT=entrypoint.sh
ARG DEST_ENTRYPOINT=/zapdados/entrypoint.sh

# Atualiza a lista de pacotes e instala o iputils-ping
RUN apt-get update && \
    apt-get install -y telnet && \
    apt-get install -y curl && \
    apt-get install -y traceroute && \
    apt-get install -y vim && \
    apt-get install -y iputils-ping && \
    rm -rf /var/lib/apt/lists/*
	
RUN mkdir /zapdados

ENV TZ=America/Recife
RUN apt-get update && apt-get install tzdata -y && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY ${TARGET_APP} ${DEST_APP}
COPY ${TARGET_ENTRYPOINT} ${DEST_ENTRYPOINT}

RUN chmod +x ${DEST_ENTRYPOINT}

CMD ["/zapdados/entrypoint.sh", "run"]