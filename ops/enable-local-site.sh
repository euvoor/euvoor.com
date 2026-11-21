#!/bin/sh
set -eu
cd /data/dev/euvoor.com
if [ "$(id -u)" -ne 0 ]; then
    exec sudo -- "$PWD/ops/enable-local-site.sh"
fi
test -s .local/tls/euvoor.test.pem
test -s .local/tls/euvoor.test-key.pem
install -m 644 ops/euvoor.test.conf /etc/apache2/sites-available/euvoor.test.conf
/usr/sbin/a2ensite euvoor.test
/usr/sbin/apache2ctl configtest
systemctl reload apache2
if ! getent ahostsv4 euvoor.test | awk '$1 == "127.0.0.1" { found=1 } END {exit !found}'; then
    printf '\n127.0.0.1 euvoor.test\n' >> /etc/hosts
fi
