
USE linux_vulnerability;
CREATE TABLE IF NOT EXISTS ubuntu(
  version_num  VARCHAR(30) NOT NULL,
  version_name char(50) NOT NULL,
  vulnerability_num varchar(50) NOT NULL,
  vulnerability_url varchar(100) NOT NULL,
  PRIMARY KEY (version_num,vulnerability_num)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS redhat(
  version_num  VARCHAR(30) NOT NULL,
  vulnerability_num varchar(50) NOT NULL,
  vulnerability_url varchar(100) NOT NULL,
  `edition` varchar(20),
  publish_date char(20),
  update_date char(20),
  cvss_score char(10),
  PRIMARY KEY (version_num,vulnerability_num)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS suse_linux(
  version_num  VARCHAR(30) NOT NULL,
  vulnerability_num varchar(50) NOT NULL,
  vulnerability_url varchar(100) NOT NULL,
  `edition` varchar(20),
  publish_date char(20),
  update_date char(20),
  cvss_score char(10),
  PRIMARY KEY (version_num,vulnerability_num)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS debian(
  version_num  VARCHAR(30) NOT NULL,
  vulnerability_num varchar(50) NOT NULL,
  vulnerability_url varchar(100) NOT NULL,
  `edition` varchar(20),
  publish_date char(20),
  update_date char(20),
  cvss_score char(10),
  PRIMARY KEY (version_num,vulnerability_num)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS fedora(
  version_num  VARCHAR(30) NOT NULL,
  vulnerability_num varchar(50) NOT NULL,
  vulnerability_url varchar(100) NOT NULL,
  `edition` varchar(20),
  publish_date char(20),
  update_date char(20),
  cvss_score char(10),
  PRIMARY KEY (version_num,vulnerability_num)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS centos(
  version_num  VARCHAR(30) NOT NULL,
  vulnerability_num varchar(50) NOT NULL,
  vulnerability_url varchar(100) NOT NULL,
  `edition` varchar(20),
  publish_date char(20),
  update_date char(20),
  cvss_score char(10),
  PRIMARY KEY (version_num,vulnerability_num)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS slackware(
  version_num  VARCHAR(30) NOT NULL,
  vulnerability_num varchar(50) NOT NULL,
  vulnerability_url varchar(100) NOT NULL,
  `edition` varchar(20),
  publish_date char(20),
  update_date char(20),
  cvss_score char(10),
  PRIMARY KEY (version_num,vulnerability_num)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS mandriva(
  version_num  VARCHAR(30) NOT NULL,
  vulnerability_num varchar(50) NOT NULL,
  vulnerability_url varchar(100) NOT NULL,
  `edition` varchar(20),
  publish_date char(20),
  update_date char(20),
  cvss_score char(10),
  PRIMARY KEY (version_num,vulnerability_num)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;