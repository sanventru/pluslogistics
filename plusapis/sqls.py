sql_update_novedades = """ update TINSPECCION_EXTERNA set i2_fechaindok=getdate(), i2_reparado=1 
where i2_chasis='{}' and i2_responsable is not null """

campos_novedades_chasis = 'ubicacion,parte,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,observacion,zona,medida'
sql_novedades_chasis = """SELECT DISTINCT
CASE WHEN I2_ZONA != '' OR
I2_ZONA LIKE '%NINGUNA%' THEN I2_ZONA ELSE '' END AS Expr1, CASE WHEN I2_PARTE = '' OR
I2_PARTE LIKE '%NINGUNA%' THEN '' ELSE I2_PARTE END AS Expr2, CASE WHEN I2_GOLPE = 'False' THEN '' ELSE 'GOLPE' END AS Expr3, CASE WHEN I2_CORTADO = 'False' THEN '' ELSE 'CORTADO' END AS Expr4,
CASE WHEN I2_DESPRENDIDO = 'False' THEN '' ELSE 'DESPRENDIDO' END AS Expr5, CASE WHEN I2_DOBLADO = 'False' THEN '' ELSE 'DOBLADO' END AS Expr6,
CASE WHEN I2_FISURADO = 'False' THEN '' ELSE 'FISURADO' END AS Expr7, CASE WHEN I2_DESCONCHE = 'False' THEN '' ELSE 'DESCONCHE' END AS Expr8,
CASE WHEN I2_RAMEADO = 'False' THEN '' ELSE 'RAMEADO' END AS Expr9, CASE WHEN I2_RASPADO = 'False' THEN '' ELSE 'RASPADO' END AS Expr10,
CASE WHEN I2_RAYAS = 'False' THEN '' ELSE 'RAYAS' END AS Expr11, CASE WHEN I2_ROTO = 'False' THEN '' ELSE 'ROTO' END AS Expr12, CASE WHEN I2_ONDULADO = 'False' THEN '' ELSE 'ONDULADO' END AS Expr13,
I2_OBSERVACION, I2_ZONADANO, I2_MEDIDA
FROM            TINSPECCION_EXTERNA AS I
WHERE        (I2_CHASIS LIKE '{}') AND (I2_GOLPE = 'True') AND (I2_REPARADO = 'False') AND (I2_RESPONSABLE IS NOT NULL) OR
(I2_CHASIS LIKE '{}') AND (I2_REPARADO = 'False') AND (I2_RESPONSABLE IS NOT NULL) AND (I2_CORTADO = 'True') OR
(I2_CHASIS LIKE '{}') AND (I2_REPARADO = 'False') AND (I2_RESPONSABLE IS NOT NULL) AND (I2_DESPRENDIDO = 'True') OR
(I2_CHASIS LIKE '{}') AND (I2_REPARADO = 'False') AND (I2_RESPONSABLE IS NOT NULL) AND (I2_DOBLADO = 'True') OR
(I2_CHASIS LIKE '{}') AND (I2_REPARADO = 'False') AND (I2_RESPONSABLE IS NOT NULL) AND (I2_FISURADO = 'True') OR
(I2_CHASIS LIKE '{}') AND (I2_REPARADO = 'False') AND (I2_RESPONSABLE IS NOT NULL) AND (I2_DESCONCHE = 'True') OR
(I2_CHASIS LIKE '{}') AND (I2_REPARADO = 'False') AND (I2_RESPONSABLE IS NOT NULL) AND (I2_RAMEADO = 'True') OR
(I2_CHASIS LIKE '{}') AND (I2_REPARADO = 'False') AND (I2_RESPONSABLE IS NOT NULL) AND (I2_RASPADO = 'True') OR
(I2_CHASIS LIKE '{}') AND (I2_REPARADO = 'False') AND (I2_RESPONSABLE IS NOT NULL) AND (I2_RAYAS = 'True') OR
(I2_CHASIS LIKE '{}') AND (I2_REPARADO = 'False') AND (I2_RESPONSABLE IS NOT NULL) AND (I2_ROTO = 'True') OR
(I2_CHASIS LIKE '{}') AND (I2_REPARADO = 'False') AND (I2_RESPONSABLE IS NOT NULL) AND (I2_ONDULADO = 'True')
UNION
SELECT DISTINCT
CASE WHEN I2_ZONA != '' OR
I2_ZONA LIKE '%NINGUNA%' THEN I2_ZONA ELSE '' END AS Expr1, CASE WHEN I2_PARTE = '' OR
I2_PARTE LIKE '%NINGUNA%' THEN '' ELSE I2_PARTE END AS Expr2, CASE WHEN I2_GOLPE = 'False' THEN '' ELSE 'GOLPE' END AS Expr3, CASE WHEN I2_CORTADO = 'False' THEN '' ELSE 'CORTADO' END AS Expr4,
CASE WHEN I2_DESPRENDIDO = 'False' THEN '' ELSE 'DESPRENDIDO' END AS Expr5, CASE WHEN I2_DOBLADO = 'False' THEN '' ELSE 'DOBLADO' END AS Expr6,
CASE WHEN I2_FISURADO = 'False' THEN '' ELSE 'FISURADO' END AS Expr7, CASE WHEN I2_DESCONCHE = 'False' THEN '' ELSE 'DESCONCHE' END AS Expr8,
CASE WHEN I2_RAMEADO = 'False' THEN '' ELSE 'RAMEADO' END AS Expr9, CASE WHEN I2_RASPADO = 'False' THEN '' ELSE 'RASPADO' END AS Expr10,
CASE WHEN I2_RAYAS = 'False' THEN '' ELSE 'RAYAS' END AS Expr11, CASE WHEN I2_ROTO = 'False' THEN '' ELSE 'ROTO' END AS Expr12, CASE WHEN I2_ONDULADO = 'False' THEN '' ELSE 'ONDULADO' END AS Expr13,
I2_OBSERVACION, I2_ZONADANO, I2_MEDIDA
FROM            TINSPECCION_EXTERNA AS I
WHERE        (I2_CHASIS LIKE '{}') AND (I2_OBSERVACION <> '') AND (I2_REPARADO = 'False') AND (I2_RESPONSABLE IS NOT NULL)
"""




campos_novedades = "chasis,marca,motor,modelo,color,concesionario,fecha"
sql_novedades = """SELECT DISTINCT
TINSPECCION_EXTERNA.I2_CHASIS AS CHASIS, TMODELO.MO_MARCA, TVEHICULO.VE_MOTOR, TVEHICULO.VE_MODELO AS MODELO, TVEHICULO.VE_COLOR AS COLOR, TFACTURACION.FA_CLIENTE AS CONCESIONARIO,
TFACTURACION.FA_FECHA AS [FECHA DE FACTURACION]
FROM            TINSPECCION_EXTERNA INNER JOIN
TVEHICULO ON TVEHICULO.VE_CHASIS = TINSPECCION_EXTERNA.I2_CHASIS LEFT OUTER JOIN
TFACTURACION ON TFACTURACION.FA_CHASIS = TINSPECCION_EXTERNA.I2_CHASIS INNER JOIN
TMODELO on TMODELO.MO_CODIGO = TVEHICULO.MO_SECUENCIAL
WHERE        (TINSPECCION_EXTERNA.I2_CHASIS IN
(SELECT        I1_CHASIS
FROM            TIN_INTERNA AS I1
WHERE        (I1_FECHA IN
(SELECT        MAX(I1_FECHA) AS Expr1
FROM            TIN_INTERNA
WHERE        (I1_CHASIS = I1.I1_CHASIS))) AND (I1_LOCALIDAD = '{}'))) AND (TINSPECCION_EXTERNA.I2_LOCALIDAD = '{}') AND
(TINSPECCION_EXTERNA.I2_ZONA <> 'NINGUNA') AND (TINSPECCION_EXTERNA.I2_REPARADO = 0) AND (TINSPECCION_EXTERNA.I2_USUARIO <> 'ADMINISTRADOR')
"""

campos_mantenimientos = "numero_orden,numero_bastidor,tipo_comercial,codigo_tipo_comercial,ldm,ldc,matricula,kilometraje,anio_modelo,matriculacion,asesor_servicio,fecha"
sql_mantenimientos = """ select 
numero_orden,numero_bastidor,tipo_comercial,codigo_tipo_comercial,ldm,ldc,matricula,kilometraje,anio_modelo,matriculacion,asesor_servicio,fecha 
from mantenimientos """
post_sql_mantenimientos = """
INSERT INTO mantenimientos
(
numero_orden
,numero_bastidor
,tipo_comercial
,codigo_tipo_comercial
,ldm
,ldc
,matricula
,kilometraje
,anio_modelo
,matriculacion
,asesor_servicio
,fecha
,lugar
,indicador1
,cumple1
,subsanada1
,indicador2
,cumple2
,subsanada2
,indicador3
,cumple3
,subsanada3
,indicador4
,cumple4
,subsanada4
,indicador5
,cumple5
,subsanada5
,indicador6
,cumple6
,subsanada6
,indicador7
,cumple7
,subsanada7
,indicador8
,cumple8
,subsanada8
,indicador9
,cumple9
,subsanada9
,indicador10
,cumple10
,subsanada10
,indicador11
,cumple11
,subsanada11
,indicador12
,cumple12
,subsanada12
)
VALUES
('{}','{}','{}','{}','{}','{}','{}','{}','{}','{}','{}','{}','{}','{}','{}','{}','{}','{}','{}','{}'
,'{}','{}','{}','{}','{}','{}','{}','{}','{}','{}','{}','{}','{}','{}','{}','{}','{}','{}','{}','{}'
,'{}','{}','{}','{}','{}','{}','{}','{}','{}')"""



campos1 = "CHASIS,DESCRIPCION,INSPECTOR,LOCALIDAD,ZONA,PARTE,GOLPE,CORTADO,DESPRENDIDO,DOBLADO,FISURADO,DESCONCHE,RAMEADO,RASPADO,RAYAS,ROTO,ONDULADO,ZONA MANUAL ANDINO,MEDIDA,OBSERVACION,RESPONSABLE,USUARIO RESPONSABLE,REPARADO,FECHA INSPECCION,CERTIFICADOR OK-NOK"
sql1= """SELECT  TINSPECCION_EXTERNA.I2_CHASIS AS CHASIS, TVEHICULO.VE_MODELO + ' ' + TVEHICULO.VE_COLOR AS DESCRIPCION,
TINSPECCION_EXTERNA.I2_USUARIO AS INSPECTOR, TINSPECCION_EXTERNA.I2_LOCALIDAD AS LOCALIDAD, TINSPECCION_EXTERNA.I2_ZONA AS ZONA,
TINSPECCION_EXTERNA.I2_PARTE AS PARTE, CASE WHEN I2_GOLPE = 'False' THEN '' ELSE 'X' END AS GOLPE,
CASE WHEN I2_CORTADO = 'False' THEN '' ELSE 'X' END AS CORTADO, CASE WHEN I2_DESPRENDIDO = 'False' THEN '' ELSE 'X' END AS DESPRENDIDO,
CASE WHEN I2_DOBLADO = 'False' THEN '' ELSE 'X' END AS DOBLADO, CASE WHEN I2_FISURADO = 'False' THEN '' ELSE 'X' END AS FISURADO,
CASE WHEN I2_DESCONCHE = 'False' THEN '' ELSE 'X' END AS DESCONCHE, CASE WHEN I2_RAMEADO = 'False' THEN '' ELSE 'X' END AS RAMEADO,
CASE WHEN I2_RASPADO = 'False' THEN '' ELSE 'X' END AS RASPADO, CASE WHEN I2_RAYAS = 'False' THEN '' ELSE 'X' END AS RAYAS,
CASE WHEN I2_ROTO = 'False' THEN '' ELSE 'X' END AS ROTO, CASE WHEN I2_ONDULADO = 'False' OR
I2_ONDULADO IS NULL THEN '' ELSE 'X' END AS ONDULADO, TINSPECCION_EXTERNA.I2_ZONADANO AS [ZONA MANUAL ANDINO],
TINSPECCION_EXTERNA.I2_MEDIDA AS MEDIDA, TINSPECCION_EXTERNA.I2_OBSERVACION AS OBSERVACION,
TINSPECCION_EXTERNA.I2_RESPONSABLE AS RESPONSABLE,
(SELECT DISTINCT UPPER(SUBSTRING(CE_RESPONSABLE, 0, CHARINDEX('/', CE_RESPONSABLE))) AS Expr1
FROM          TCERTIFICACION_NOVEDADES AS TCERTIFICACION_NOVEDADES_1
WHERE      (CE_CHASIS = TINSPECCION_EXTERNA.I2_CHASIS) AND (CE_LOCALIDAD = TINSPECCION_EXTERNA.I2_LOCALIDAD) AND (CONVERT(DATETIME,
CE_FECHA) BETWEEN TINSPECCION_EXTERNA.I2_FECHA - 0.00003 AND TINSPECCION_EXTERNA.I2_FECHA + 0.00003) AND 
(SUBSTRING(CE_RESPONSABLE, CHARINDEX('/', CE_RESPONSABLE) + 1, len(CE_RESPONSABLE)  - CHARINDEX('/', CE_RESPONSABLE))
= TINSPECCION_EXTERNA.I2_RESPONSABLE)) AS [USUARIO RESPONSABLE],
CASE WHEN TINSPECCION_EXTERNA.I2_REPARADO = 'False' THEN 'NO' ELSE 'SI' END AS REPARADO, TINSPECCION_EXTERNA.I2_FECHA AS [FECHA INSPECCION],
(SELECT DISTINCT CE_OBSERVACION
FROM          TCERTIFICACION_NOVEDADES
WHERE      (CE_CHASIS = TINSPECCION_EXTERNA.I2_CHASIS) AND (CE_LOCALIDAD = TINSPECCION_EXTERNA.I2_LOCALIDAD) AND (CONVERT(DATETIME,
CE_FECHA) BETWEEN TINSPECCION_EXTERNA.I2_FECHA - 0.00003 AND TINSPECCION_EXTERNA.I2_FECHA + 0.00003) AND
(SUBSTRING(CE_RESPONSABLE, CHARINDEX('/', CE_RESPONSABLE) + 1, len(CE_RESPONSABLE)  - CHARINDEX('/', CE_RESPONSABLE))
= TINSPECCION_EXTERNA.I2_RESPONSABLE)) AS [CERTIFICADOR OK-NOK]
FROM         TINSPECCION_EXTERNA INNER JOIN
TVEHICULO ON TVEHICULO.VE_CHASIS = TINSPECCION_EXTERNA.I2_CHASIS
WHERE     (TINSPECCION_EXTERNA.I2_CHASIS IN
(SELECT     I1_CHASIS
FROM          TIN_INTERNA AS I
WHERE      (I1_FECHA =
(SELECT     TOP (1) MIN(I1_FECHA) AS Expr1
FROM          TIN_INTERNA AS I1
WHERE      (I1_CHASIS = I.I1_CHASIS) AND (I1_LOCALIDAD = 'INGRESO PATIO QUITO'))) AND (I1_FECHA BETWEEN '{}' AND
'{}') AND 
((SELECT     TOP (1) I1_LOCALIDAD
FROM         TIN_INTERNA AS TIN_INTERNA_2
WHERE     (I1_CHASIS = I.I1_CHASIS) AND (I1_DESTINO = 'PATIO GM OBB CALACALI')
ORDER BY I1_FECHA) = '{}'))) AND (TINSPECCION_EXTERNA.I2_FECHA <=
(SELECT DISTINCT I1_FECHA + 0.003 AS Expr1
FROM          TIN_INTERNA AS I3
WHERE      (I1_FECHA =
(SELECT     TOP (1) MIN(I1_FECHA) AS Expr1
FROM          TIN_INTERNA AS I1
WHERE      (I1_CHASIS = TINSPECCION_EXTERNA.I2_CHASIS) AND (I1_LOCALIDAD = 'INGRESO PATIO QUITO'))) AND (I1_FECHA BETWEEN
'{}' AND '{}') AND
((SELECT     TOP (1) I1_LOCALIDAD
FROM         TIN_INTERNA AS TIN_INTERNA_2
WHERE     (I1_CHASIS = TINSPECCION_EXTERNA.I2_CHASIS) AND (I1_DESTINO = 'PATIO GM OBB CALACALI')
ORDER BY I1_FECHA) = '{}')))
ORDER BY CHASIS, [FECHA INSPECCION]"""

campos2 = "LO_SECUENCIAL,LO_DESCRIPCION"
sql2= """ select LO_SECUENCIAL, LO_DESCRIPCION from TLOCALIDAD where LO_DESCRIPCION like 'SALIDA %'"""

