
USE linux_vulnerability;
CREATE TABLE IF NOT EXISTS ubuntu(
  version_num  VARCHAR(30) NOT NULL,
  version_name char(50) NOT NULL,
  vulnerability_num varchar(50) NOT NULL,
  vulnerability_url varchar(100) NOT NULL,
  PRIMARY KEY (version_num,vulnerability_num)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
