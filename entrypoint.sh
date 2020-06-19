if [ ! -z $REACT_APP_DRUID_URL ]
then
   echo "Inserting ${REACT_APP_DRUID_URL} Into Header"
   sed -i -e 's|DRUID_URL_PLACEHOLDER|http://'"${DRUID_URL}"'|' ./src/components/common/header_bottom.html
fi

if [ ! -z $REACT_APP_PIVOT_URL ]
then
   echo "Inserting ${REACT_APP_PIVOT_URL} Into Header"
   sed -i -e 's|PIVOT_URL_PLACEHOLDER|http://'"${PIVOT_URL}"'|' ./src/components/common/header_bottom.html
fi
 
if [ ! -z $REACT_APP_SUPERSET_URL ]
then
   echo "Inserting ${REACT_APP_SUPERSET_URL} Into Header"
   sed -i -e 's|SUPERSET_URL_PLACEHOLDER|http://'"${SUPERSET_URL}"'|' ./src/components/common/header_bottom.html
fi
 
 /docker-entrypoint.sh