import type { CollectionSector, SectorId } from './types';

export const collectionSectors: CollectionSector[] = [
  {
    id: 'sector-01',
    name: 'Setor 01 - Centro',
    neighborhoods: [
      'Quadrante entre a Av. Getúlio Vargas, Av. Rio Grande do Sul, Av. Venâncio Aires e Rua Tiradentes',
    ],
  },
  {
    id: 'sector-02',
    name: 'Setor 02 - Centro Norte',
    neighborhoods: [
      'Quadrante entre a Rua Tiradentes, Av. Getúlio Vargas, Av. Venâncio Aires e Av. Salgado Filho',
    ],
  },
  {
    id: 'sector-03',
    name: 'Setor 03',
    neighborhoods: [
      'Bela Vista',
      'COHAB',
      'Centro (entre a Av. Getúlio Vargas e Rua 10 de Novembro)',
      'Ditz',
      'Geis',
      'Patz',
    ],
  },
  {
    id: 'sector-04',
    name: 'Setor 04',
    neighborhoods: [
      'Casaroto',
      'Jardim das Palmeiras',
      'Jardim Residencial Sabo',
      'Kurtz',
      'Meller Sul',
      'Centro Sul',
      'Wilde',
    ],
  },
  {
    id: 'sector-05',
    name: 'Setor 05',
    neighborhoods: [
      'Hortência',
      'Missões (norte da Av. Rio Grande do Sul)',
      'Olavo Reis',
      'Padoim',
      'Residencial Ipanema',
      'Rosani Sanches',
      'São Carlos',
    ],
  },
  {
    id: 'sector-06',
    name: 'Setor 06',
    neighborhoods: ['Alcebíades', 'Esperança', 'Gueller', 'Piratini', 'Rosa', 'Vier', 'Pippi'],
  },
  {
    id: 'sector-07',
    name: 'Setor 07',
    neighborhoods: [
      'Braga',
      'Cristal (Santa Bárbara)',
      'Missões (ao sul da Av. Rio Grande do Sul)',
      'Linha Paraíso',
      'Panazollo',
      'Pilau',
      'Radins',
      'Sagrada Família',
    ],
  },
  {
    id: 'sector-08',
    name: 'Setor 08',
    neighborhoods: [
      'Aeroporto',
      'A.F.P.M.',
      'Aguiar',
      'Antero Rosa',
      'Cemitério',
      'Cristina Vontobel (Colméia)',
      'Jardim',
      'João Goulart (Colméia III)',
      'Hans Paff (Distrito Industrial III)',
      'Indubras',
      'Industrial',
      'Marcírio Machado',
      'Nova',
      'Santa Clara',
      'Trezentos Anos',
      'Vera Cruz',
    ],
  },
  {
    id: 'sector-09',
    name: 'Setor 09',
    neighborhoods: [
      'Aliança',
      'Alvorada',
      'Castelarim',
      'Fava',
      'Juarez Lemos',
      'Meller Norte',
      'Maria Ritter',
      'Quartel',
      'Sao Pedro',
    ],
  },
  {
    id: 'sector-10',
    name: 'Setor 10',
    neighborhoods: [
      'Avanço (Promorar)',
      'Braga',
      'Brigada',
      'Emília',
      'Fenamilho',
      'Haller',
      'Harmonia (Marenzi)',
      'Linha Picadinha',
      'Menges',
      'Moscon',
      'Muller',
      'Ortiz',
      'Sepé Tiaraju',
      'Polícia Rodoviária',
      'RS 344',
      'São João',
      'Santa Fé',
    ],
  },
  {
    id: 'sector-11',
    name: 'Setor 11',
    neighborhoods: [
      'Boa Esperança',
      'Dido',
      'Oliveira',
      'Rosenthal',
      'Santo Antônio (atrás da Rodoviária)',
      'Subuski',
      'Leonel Brizola',
    ],
  },
  {
    id: 'sector-12',
    name: 'Setor 12',
    neighborhoods: [
      'Assistência Braga',
      'Dornelles II (Universitário)',
      'Menezes',
      'Morada do Sol',
      'Neri Cavalheiro',
      'Pascotini',
      'Reserva das Missões',
      'Rogowski',
      'Rosenthal',
      'Schirmer',
      'Tesche',
      'Uri',
      'Bairro COHAB',
    ],
  },
];

export function getSector(sectorId: SectorId) {
  return collectionSectors.find((sector) => sector.id === sectorId);
}

export function getSectorLabel(sectorId: SectorId) {
  return getSector(sectorId)?.name ?? sectorId;
}
