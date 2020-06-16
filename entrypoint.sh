if [ ! -z $DRUID_URL ]
then
   echo "Inserting ${DRUID_URL} Into Header"
   sed -i -e 's|DRUID_URL_PLACEHOLDER|http://'"${DRUID_URL}"'|' ./src/components/common/header_bottom.html
fi

if [ ! -z $PIVOT_URL ]
then
   echo "Inserting ${PIVOT_URL} Into Header"
   sed -i -e 's|PIVOT_URL_PLACEHOLDER|http://'"${PIVOT_URL}"'|' ./src/components/common/header_bottom.html
fi

if [ ! -z $ELK_URL ]
then
   echo "Inserting ${ELK_URL} Into Header"
   sed -i -e 's|ELK_URL_PLACEHOLDER|http://'"${ELK_URL}"'|' ./src/components/common/header_bottom.html
fi

if [ ! -z $SUPERSET_URL ]
then
   echo "Inserting ${SUPERSET_URL} Into Header"
   sed -i -e 's|SUPERSET_URL_PLACEHOLDER|http://'"${SUPERSET_URL}"'|' ./src/components/common/header_bottom.html
fi

if [ ! -z $KAFKA_URL_PUBLIC ]
then
   echo "Inserting ${KAFKA_URL_PUBLIC} Into Header"
   sed -i -e 's|KAFKA_URL_PLACEHOLDER|'"${KAFKA_URL_PUBLIC}"'|' ./src/components/common/header_bottom.html
fi

