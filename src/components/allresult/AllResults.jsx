import React, { useEffect, useState } from "react";
import "./AllResults.css";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import COLORS from "../../assets/constants/colors";
import { locationdata } from "../alllocation/AllLocation";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetAllLocationWithTimeQuery,
  useGetAllResultWebQuery,
} from "../../helper/Networkcall";
import { LoadingComponent } from "../helper/LoadingComponent";
import { NodataFound } from "../helper/NodataFound";

const resultdata = {
  success: true,
  results: [
    {
      _id: "66bf4ee01a830e5281e70221",
      lottime: {
        _id: "66bf4ee01a830e5281e70221",
        lottime: "07:00 AM",
        lotlocation: "66bf4ecb1a830e5281e70214",
        createdAt: "2024-08-16T12:37:48.424Z",
        __v: 0,
      },
      dates: [
        {
          lotdate: {
            _id: "66bf4f1a1a830e5281e70260",
            lotdate: "17-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "04",
              lotdate: {
                _id: "66bf4f1a1a830e5281e70260",
                lotdate: "17-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f0e1a830e5281e7024d",
            lotdate: "16-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "02",
              lotdate: {
                _id: "66bf4f0e1a830e5281e7024d",
                lotdate: "16-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f1a1a830e5281e70260",
            lotdate: "17-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "04",
              lotdate: {
                _id: "66bf4f1a1a830e5281e70260",
                lotdate: "17-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f0e1a830e5281e7024d",
            lotdate: "16-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "02",
              lotdate: {
                _id: "66bf4f0e1a830e5281e7024d",
                lotdate: "16-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f1a1a830e5281e70260",
            lotdate: "17-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "04",
              lotdate: {
                _id: "66bf4f1a1a830e5281e70260",
                lotdate: "17-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f0e1a830e5281e7024d",
            lotdate: "16-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "02",
              lotdate: {
                _id: "66bf4f0e1a830e5281e7024d",
                lotdate: "16-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f1a1a830e5281e70260",
            lotdate: "17-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "04",
              lotdate: {
                _id: "66bf4f1a1a830e5281e70260",
                lotdate: "17-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f0e1a830e5281e7024d",
            lotdate: "16-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "02",
              lotdate: {
                _id: "66bf4f0e1a830e5281e7024d",
                lotdate: "16-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f1a1a830e5281e70260",
            lotdate: "17-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "04",
              lotdate: {
                _id: "66bf4f1a1a830e5281e70260",
                lotdate: "17-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f0e1a830e5281e7024d",
            lotdate: "16-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "02",
              lotdate: {
                _id: "66bf4f0e1a830e5281e7024d",
                lotdate: "16-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
      ],
      createdAt: "2024-08-16T12:37:48.422Z",
    },
    {
      _id: "66bf4eec1a830e5281e7022a",
      lottime: {
        _id: "66bf4eec1a830e5281e7022a",
        lottime: "08:00 AM",
        lotlocation: "66bf4ecb1a830e5281e70214",
        createdAt: "2024-08-16T12:37:48.424Z",
        __v: 0,
      },
      dates: [
        {
          lotdate: {
            _id: "66bf4f321a830e5281e70290",
            lotdate: "17-08-2024",
            lottime: "66bf4eec1a830e5281e7022a",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "05",
              lotdate: {
                _id: "66bf4f321a830e5281e70290",
                lotdate: "17-08-2024",
                lottime: "66bf4eec1a830e5281e7022a",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4eec1a830e5281e7022a",
                lottime: "08:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f261a830e5281e7027d",
            lotdate: "16-08-2024",
            lottime: "66bf4eec1a830e5281e7022a",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "03",
              lotdate: {
                _id: "66bf4f261a830e5281e7027d",
                lotdate: "16-08-2024",
                lottime: "66bf4eec1a830e5281e7022a",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4eec1a830e5281e7022a",
                lottime: "08:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
      ],
      createdAt: "2024-08-16T12:37:48.422Z",
    },
    {
      _id: "66bf4ef71a830e5281e70233",
      lottime: {
        _id: "66bf4ef71a830e5281e70233",
        lottime: "09:00 AM",
        lotlocation: "66bf4ecb1a830e5281e70214",
        createdAt: "2024-08-16T12:37:48.424Z",
        __v: 0,
      },
      dates: [
        {
          lotdate: {
            _id: "66bf4f441a830e5281e702ad",
            lotdate: "16-08-2024",
            lottime: "66bf4ef71a830e5281e70233",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "01",
              lotdate: {
                _id: "66bf4f441a830e5281e702ad",
                lotdate: "16-08-2024",
                lottime: "66bf4ef71a830e5281e70233",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ef71a830e5281e70233",
                lottime: "09:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f4d1a830e5281e702c0",
            lotdate: "17-08-2024",
            lottime: "66bf4ef71a830e5281e70233",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "02",
              lotdate: {
                _id: "66bf4f4d1a830e5281e702c0",
                lotdate: "17-08-2024",
                lottime: "66bf4ef71a830e5281e70233",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ef71a830e5281e70233",
                lottime: "09:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
      ],
      createdAt: "2024-08-16T12:37:48.422Z",
    },
    {
      _id: "66bf4f011a830e5281e7023c",
      lottime: {
        _id: "66bf4f011a830e5281e7023c",
        lottime: "10:00 AM",
        lotlocation: "66bf4ecb1a830e5281e70214",
        createdAt: "2024-08-16T12:37:48.424Z",
        __v: 0,
      },
      dates: [
        {
          lotdate: {
            _id: "66bf4f591a830e5281e702dd",
            lotdate: "16-08-2024",
            lottime: "66bf4f011a830e5281e7023c",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "05",
              lotdate: {
                _id: "66bf4f591a830e5281e702dd",
                lotdate: "16-08-2024",
                lottime: "66bf4f011a830e5281e7023c",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4f011a830e5281e7023c",
                lottime: "10:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f631a830e5281e702f0",
            lotdate: "17-08-2024",
            lottime: "66bf4f011a830e5281e7023c",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "03",
              lotdate: {
                _id: "66bf4f631a830e5281e702f0",
                lotdate: "17-08-2024",
                lottime: "66bf4f011a830e5281e7023c",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4f011a830e5281e7023c",
                lottime: "10:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
      ],
      createdAt: "2024-08-16T12:37:48.422Z",
    },
    {
      _id: "66bf4ee01a830e5281e70221",
      lottime: {
        _id: "66bf4ee01a830e5281e70221",
        lottime: "07:00 AM",
        lotlocation: "66bf4ecb1a830e5281e70214",
        createdAt: "2024-08-16T12:37:48.424Z",
        __v: 0,
      },
      dates: [
        {
          lotdate: {
            _id: "66bf4f1a1a830e5281e70260",
            lotdate: "17-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "04",
              lotdate: {
                _id: "66bf4f1a1a830e5281e70260",
                lotdate: "17-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f0e1a830e5281e7024d",
            lotdate: "16-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "02",
              lotdate: {
                _id: "66bf4f0e1a830e5281e7024d",
                lotdate: "16-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
      ],
      createdAt: "2024-08-16T12:37:48.422Z",
    },
    {
      _id: "66bf4eec1a830e5281e7022a",
      lottime: {
        _id: "66bf4eec1a830e5281e7022a",
        lottime: "08:00 AM",
        lotlocation: "66bf4ecb1a830e5281e70214",
        createdAt: "2024-08-16T12:37:48.424Z",
        __v: 0,
      },
      dates: [
        {
          lotdate: {
            _id: "66bf4f321a830e5281e70290",
            lotdate: "17-08-2024",
            lottime: "66bf4eec1a830e5281e7022a",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "05",
              lotdate: {
                _id: "66bf4f321a830e5281e70290",
                lotdate: "17-08-2024",
                lottime: "66bf4eec1a830e5281e7022a",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4eec1a830e5281e7022a",
                lottime: "08:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f261a830e5281e7027d",
            lotdate: "16-08-2024",
            lottime: "66bf4eec1a830e5281e7022a",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "03",
              lotdate: {
                _id: "66bf4f261a830e5281e7027d",
                lotdate: "16-08-2024",
                lottime: "66bf4eec1a830e5281e7022a",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4eec1a830e5281e7022a",
                lottime: "08:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
      ],
      createdAt: "2024-08-16T12:37:48.422Z",
    },
    {
      _id: "66bf4ee01a830e5281e70221",
      lottime: {
        _id: "66bf4ee01a830e5281e70221",
        lottime: "07:00 AM",
        lotlocation: "66bf4ecb1a830e5281e70214",
        createdAt: "2024-08-16T12:37:48.424Z",
        __v: 0,
      },
      dates: [
        {
          lotdate: {
            _id: "66bf4f1a1a830e5281e70260",
            lotdate: "17-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "04",
              lotdate: {
                _id: "66bf4f1a1a830e5281e70260",
                lotdate: "17-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f0e1a830e5281e7024d",
            lotdate: "16-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "02",
              lotdate: {
                _id: "66bf4f0e1a830e5281e7024d",
                lotdate: "16-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
      ],
      createdAt: "2024-08-16T12:37:48.422Z",
    },
    {
      _id: "66bf4eec1a830e5281e7022a",
      lottime: {
        _id: "66bf4eec1a830e5281e7022a",
        lottime: "08:00 AM",
        lotlocation: "66bf4ecb1a830e5281e70214",
        createdAt: "2024-08-16T12:37:48.424Z",
        __v: 0,
      },
      dates: [
        {
          lotdate: {
            _id: "66bf4f321a830e5281e70290",
            lotdate: "17-08-2024",
            lottime: "66bf4eec1a830e5281e7022a",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "05",
              lotdate: {
                _id: "66bf4f321a830e5281e70290",
                lotdate: "17-08-2024",
                lottime: "66bf4eec1a830e5281e7022a",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4eec1a830e5281e7022a",
                lottime: "08:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f261a830e5281e7027d",
            lotdate: "16-08-2024",
            lottime: "66bf4eec1a830e5281e7022a",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "03",
              lotdate: {
                _id: "66bf4f261a830e5281e7027d",
                lotdate: "16-08-2024",
                lottime: "66bf4eec1a830e5281e7022a",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4eec1a830e5281e7022a",
                lottime: "08:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
      ],
      createdAt: "2024-08-16T12:37:48.422Z",
    },
    {
      _id: "66bf4ee01a830e5281e70221",
      lottime: {
        _id: "66bf4ee01a830e5281e70221",
        lottime: "07:00 AM",
        lotlocation: "66bf4ecb1a830e5281e70214",
        createdAt: "2024-08-16T12:37:48.424Z",
        __v: 0,
      },
      dates: [
        {
          lotdate: {
            _id: "66bf4f1a1a830e5281e70260",
            lotdate: "17-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "04",
              lotdate: {
                _id: "66bf4f1a1a830e5281e70260",
                lotdate: "17-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f0e1a830e5281e7024d",
            lotdate: "16-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "02",
              lotdate: {
                _id: "66bf4f0e1a830e5281e7024d",
                lotdate: "16-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
      ],
      createdAt: "2024-08-16T12:37:48.422Z",
    },
    {
      _id: "66bf4eec1a830e5281e7022a",
      lottime: {
        _id: "66bf4eec1a830e5281e7022a",
        lottime: "08:00 AM",
        lotlocation: "66bf4ecb1a830e5281e70214",
        createdAt: "2024-08-16T12:37:48.424Z",
        __v: 0,
      },
      dates: [
        {
          lotdate: {
            _id: "66bf4f321a830e5281e70290",
            lotdate: "17-08-2024",
            lottime: "66bf4eec1a830e5281e7022a",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "05",
              lotdate: {
                _id: "66bf4f321a830e5281e70290",
                lotdate: "17-08-2024",
                lottime: "66bf4eec1a830e5281e7022a",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4eec1a830e5281e7022a",
                lottime: "08:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f261a830e5281e7027d",
            lotdate: "16-08-2024",
            lottime: "66bf4eec1a830e5281e7022a",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "03",
              lotdate: {
                _id: "66bf4f261a830e5281e7027d",
                lotdate: "16-08-2024",
                lottime: "66bf4eec1a830e5281e7022a",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4eec1a830e5281e7022a",
                lottime: "08:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
      ],
      createdAt: "2024-08-16T12:37:48.422Z",
    },
  ],
};

export const AllResults = () => {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(null);

  const { accesstoken, user } = useSelector((state) => state.user);

  // GETTING ALL THE LOCATION

  const {
    data: alllocation,
    error: alllocationError,
    isLoading: allocationIsLoading,
  } = useGetAllLocationWithTimeQuery(accesstoken);

  const {
    data: allresult,
    error: allresultError,
    isLoading: allresultIsLoading,
  } = useGetAllResultWebQuery({
    accessToken: accesstoken,
    locationid: selectedItem?._id,
  });

  useEffect(() => {
    if (!allocationIsLoading && alllocation) {
      setSelectedItem(alllocation?.locationData[0]);
      console.log("Calling allresult");
      console.log(allocationIsLoading, allresult);
    }
  }, [allocationIsLoading, alllocation]);

  useEffect(() => {
    if (alllocation) {
      console.log("Calling allresult only:: " + allresultIsLoading);
      console.log(allocationIsLoading, allresult);
    }
  }, [allresult, selectedItem]);

  const getAllResultForOtherLocation = (item) => {
    console.log("GETTING RESULT...");
    setSelectedItem(item);
    console.log("allresult :: " + allresultIsLoading);
    console.log(JSON.stringify(selectedItem));
  };

  return (
    <div className="alContainer">
      {/** TOP NAVIGATION CONTATINER */}
      <div className="alCreatLocationTopContainer">
        <div className="alCreatLocationTopContaineCL">
          <label className="alCreatLocationTopContainerlabel">All Result</label>
        </div>
      </div>
      {allocationIsLoading ? (
        <LoadingComponent />
      ) : (
        <div className="PLContainerMain">
          <div className="ARLC">
            {alllocation?.locationData?.map((item, index) => (
              <div
                key={index}
                onClick={() => getAllResultForOtherLocation(item)}
                className="ARLocConC"
              >
                <div
                  className="PLLLocContainer"
                  style={{
                    background:
                      index % 2 === 0
                        ? "linear-gradient(90deg, #1993FF, #0F5899)"
                        : "linear-gradient(90deg, #7EC630, #3D6017)",
                    borderColor:
                      selectedItem?._id === item._id
                        ? COLORS.blue
                        : "transparent", // Use transparent for no border
                    borderWidth: "2px",
                    borderStyle:
                      selectedItem?._id === item._id ? "solid" : "none", // Apply border style conditionally
                  }}
                >
                  <label className="locLabel">{item.name}</label>
                  <label className="limitLabel">Max {item.limit}</label>
                </div>
              </div>
            ))}
          </div>

          {/** ALL RESULT MAIN */}
          <div className="ARMC">
            {allresultIsLoading ? (
              <LoadingComponent />
            ) : allresult?.results?.length === 0 ? (
              <NodataFound title={"No data available"} />
            ) : (
              allresult?.results.map((item, index) => (
                <div className="ARMCContent" key={index}>
                  <div className="ARMCContentTC">
                    <label className="pdR"> {item.lottime.lottime}</label>
                  </div>
                  <div className="ARMCContentDC">
                    {item.dates.map((dateitem, dateindex) => (
                      <div className="ARMCContentDConC" key={dateindex}>
                        <div className="ARMCContentDConCDate">
                          <label className="pdR">
                            {dateitem.lotdate.lotdate}
                          </label>
                        </div>
                        <div className="ARMCContentDConCResult">
                          <label className="pdR">
                            {dateitem.results[0].resultNumber}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
